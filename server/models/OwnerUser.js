import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import slug from "mongoose-slug-generator";
mongoose.plugin(slug);

const OwnerUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      maxLength: 20,
    },
    slug: {
      type: String,
      slug: ["firstName", "lastName"],
      slug_padding_size: 4,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please provide an address"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide a phone number"],
      unique: true,
      match: [
        /^(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|082|088|091|094|070|079|077|076|078|090|093|089|056|058|092|059|099)[0-9]{7}$/,
        "Nhập số điện thoại đúng, ví dụ 0987654321",
      ],
    },
    dateOfBirth: {
      type: String,
      required: [true, "Please provide a date of birth"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Nam", "Nữ", "Không muốn trả lời"],
        message: "{VALUE} is not supported",
      },
    },
    profileImage: {
      type: String,
      required: [true, "Please provide a profile image"],
    },
    contacts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "LodgerUser",
        default: [],
      },
    ],
    password: {
      type: String,
      required: [true, "Mật khẩu ít nhất 8 kí tự"],
      minlength: 8,
      select: false,
    },
    
    passwordResetToken: {
      type: String,
      select: false,
    },
    accountStatus: {
      type: Boolean,
      default: false,
    },
    accountVerificationToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

// Hash password before saving to database
OwnerUserSchema.pre("save", async function () {
  if (!this.isModified("password")) return; //avoid re-hashing of password

  const salt = await bcrypt.genSalt(10); // generate salt
  this.password = await bcrypt.hash(this.password, salt); // hash password
});

// Compare entered password with hashed password in database
OwnerUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // return true if passwords match else false
};

// create JWT Access token for owner user authentication
OwnerUserSchema.methods.createAccessToken = function () {
  // return JWT token with user id
  return jwt.sign(
    { userId: this._id, userType: "owner" },
    process.env.ACCESS_TOKEN_SECRET_OWNER,
    {
      expiresIn: process.env.ACCESS_LIFETIME,
    }
  );
};

// create JWT Refresh token for owner user authentication
OwnerUserSchema.methods.createRefreshToken = function () {
  // return JWT token with user id
  return jwt.sign(
    { userId: this._id, userType: "owner" },
    process.env.REFRESH_TOKEN_SECRET_OWNER,
    {
      expiresIn: process.env.REFRESH_LIFETIME,
    }
  );
};

export default mongoose.model("OwnerUser", OwnerUserSchema);
