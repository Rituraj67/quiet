import prisma from "../../db/db.config.js";
import jwt from "jsonwebtoken";
import uploadOnCloudinary from "../utils/cloudinary.js";

// const varifyToken = (req, res, next) => {
//     const token = req.headers.cookie.split("=")[1];

//     if (!token) {
//       res.status(401).send({ msg: "No token found" });
//     }
//     let payload = jwt.verify(token, process.env.SECRET_KEY);
//     if (payload.email) {
//         req.email=payload.email
//       next();
//     } else res.status(401).send({ msg: "Invalid Token" });
//   };

const getUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.params.email,
    },
    select: {
      bio: true,
      createdAt: true,
      dp: true,
      email: true,
      isVarified: true,
      userID: true,
      username: true,
    },
  });
  // console.log(user);

  res.status(200).send({
    user,
  });
};
const uploadImg = async (req, res) => {
  let imgurl = null;
  const userId = req.userId;

  if (req.file) {
    imgurl = await uploadOnCloudinary(req.file.path);
    console.log("file Object = " + imgurl);
  }
  try {
    const user = await prisma.user.update({
      where: {
        userID: userId,
      },
      data: {
        dp: imgurl,
      },
    });
    res.status(202).json(user);
  } catch (error) {
    res.status(403).send(error);
  }
};

const getUserPost = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  console.log(page, offset);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.email,
      },
      select: {
        posts: {
          include: {
            comments: {
              include: {
                user: true,
              },
            },
            user: true,
            upvotes: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: offset,
          take: limit,
        },
      },
    });

    res.status(200).send({ posts: user.posts });
  } catch (error) {
    console.log(error);
  }
};

// const userController={getUser,varifyToken};
const userController = { getUser, uploadImg, getUserPost };
export default userController;
