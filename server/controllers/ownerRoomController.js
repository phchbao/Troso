import Room from "../models/Room.js";
import { nanoid } from "nanoid";
import {
  NotFoundError,
  ForbiddenRequestError,
  BadRequestError,
} from "../request-errors/index.js";

/**
 * @description Post Real Estate
 * @returns {object} room
 */
const postRoom = async (req, res) => {
  const province = req.body.province;
  const district = req.body.district;
  const detailAddress = req.body.detailAddress;
  req.body.address = { province, district, detailAddress };
  req.body.roomOwner = req.user.userId;
  req.body.roomId = nanoid(7);

  const room = await Room.create(req.body);
  res.status(201).json({ room });
};

/**
 * @description Get Owner's Real Estates
 * @returns {object} room
 */
const getOwnerRooms = async (req, res) => {
  let roomResults = Room.find({
    roomOwner: req.user.userId,
  }).sort("-createdAt");

  const page = Number(req.query.page) || 1; //page number from query string
  const limit = 3; //limit of items per response
  const skip = (page - 1) * limit; //calculate the number of documents to skip

  roomResults = roomResults.skip(skip).limit(limit);
  const rooms = await roomResults; //execute the query

  //get total documents in the Room collection
  const totalRooms = await Room.countDocuments({
    roomOwner: req.user.userId,
  });

  //calculate total pages
  const numberOfPages = Math.ceil(totalRooms / limit);

  res.json({ rooms, numberOfPages, totalRooms });
};

/**
 * @description Get single room
 * @returns {object} room
 */
const getSingleRoom = async (req, res) => {
  const { slug } = req.params;
  const room = await Room.findOne({ slug });
  if (!room) {
    throw new NotFoundError(`Room not found`);
  }
  res.json({ room });
};

/**
 * @description Cập nhật chi tiết bài đăng
 * @returns {object} room
 */
const updateRoomDetails = async (req, res) => {
  const {
    price,
    province,
    district,
    detailAddress,
    description,
    area,
    beds,
    amenities,
    category,
  } = req.body;

  if (
    !price ||
    !province ||
    !district ||
    !detailAddress||
    !description ||
    !area ||
    !beds ||
    !amenities ||
    !category
  ) {
    throw new BadRequestError("All fields are required");
  }

  const { slug } = req.params;
  const room = await Room.findOne({ slug });

  if (!room) {
    throw new NotFoundError(`Room not found`);
  }

  if (room.roomOwner.toString() !== req.user.userId) {
    throw new ForbiddenRequestError(
      "You are not authorized to update this room"
    );
  }

  const updatedRoom = await Room.findOneAndUpdate(
    { slug },
    {
      price,
      description,
      area,
      beds,
      amenities,
      category,
      address: { province, district, detailAddress },
    },
    { new: true, runValidators: true }
  );

  res.json({ updatedRoom });
};

/**
 * @description Cập nhật chi tiết bài đăng
 * @returns message
 */
const deleteRoom = async (req, res) => {
  const { slug } = req.params;
  const room = await Room.findOne({ slug });

  if (!room) {
    throw new NotFoundError(`Room not found`);
  }

  // check if user is authorized to delete room
  if (room.roomOwner.toString() !== req.user.userId) {
    throw new ForbiddenRequestError(
      "You are not authorized to delete this room"
    );
  }

  // check if room is okay to delete
  if (room.status === false) {
    throw new BadRequestError(
      "Room cannot be deleted, it has active lodger"
    );
  }

  await Room.findOneAndDelete({
    slug,
    roomOwner: req.user.userId,
    status: true,
  });

  res.json({ success: true, message: "Xóa phòng thành công" });
};

export {
  postRoom,
  getOwnerRooms,
  getSingleRoom,
  updateRoomDetails,
  deleteRoom,
};
