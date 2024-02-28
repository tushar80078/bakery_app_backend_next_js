const { PrismaClient } = require("@prisma/client");
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

//-------------------------  Create Product ----------------------------------------

const createUser = async (userData) => {
  const userResponse = await prisma.users.create({
    data: userData,
  });

  return userResponse;
};

//-------------------------  Get User By Email Id ----------------------------------------

const getUserByEmailId = async (userData) => {
  const userResponse = await prisma.users.findFirst({
    where: {
      email_id: userData,
    },
  });

  return userResponse;
};

// //-------------------------  Get User By Phone Number ----------------------------------------

const getUserByPhoneNumber = async (userData) => {
  const userResponse = await prisma.users.findFirst({
    where: {
      phone_number: userData,
    },
  });

  return userResponse;
};

// //-------------------------  Get Courses By Id ----------------------------------------

// const getCourseByCourseId = async (courseId)=>{
//     if(typeof courseId != Number)
//     {
//         courseId = parseInt(courseId);
//     }

//     const courseResponse = await prisma.courses.findFirst({
//         where:{
//             id:courseId
//         }
//     })

//     return courseResponse;
// }

// //-------------------------  Update Course By ID----------------------------------------

// const updateCourseById = async (courseId,courseData) =>{

//     if(typeof courseId != Number)
//     {
//         courseId = parseInt(courseId);
//     }

//     const existingData = await getCourseByCourseId(courseId);

//     if(!existingData)
//     {
//         throw new Error("Course With Given Id Not Found")
//     }

//     courseData = {...existingData,...courseData};

//     const courseResponse = await prisma.courses.update({
//         where:{
//             id:courseId
//         },
//         data:courseData
//     })

//     return courseResponse;
// }

// //-------------------------  Delete Course By ID----------------------------------------

// const deleteCourseById = async (courseId) =>{
//     if(typeof courseId != Number)
//     {
//         courseId = parseInt(courseId);
//     }

//     const courseResponse = await prisma.courses.delete({
//         where:{
//             id:courseId
//         }
//     })

//     return courseResponse;
// }

//--------------------------- Module Exports -------------------------------------

module.exports = {
  createUser,
  getUserByEmailId,
  getUserByPhoneNumber,
  // updateCourseById,
  // deleteCourseById,
  // getCourseByCourseId
};
