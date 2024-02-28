const { PrismaClient } = require("@prisma/client");
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

//-------------------------  Create Category ----------------------------------------

const createCategory = async (categoryData) => {
  const categoryResponse = await prisma.category.create({
    data: categoryData,
  });

  return categoryResponse;
};

//-------------------------  Get Category By Name ----------------------------------------

const getCategoryByName = async (categoryData) => {
  const categoryResponse = await prisma.category.findFirst({
    where: {
      category: categoryData,
    },
  });

  return categoryResponse;
};

//-------------------------  Get All Categories ----------------------------------------

const getAllCategories = async () => {
  const categoryResponse = await prisma.category.findMany();

  return categoryResponse;
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
  createCategory,
  getCategoryByName,
  getAllCategories,
  // getAllCourses,
  // updateCourseById,
  // deleteCourseById,
  // getCourseByCourseId
};
