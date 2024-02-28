const categoryService = require("@/services/category.service");
const dateTimeGenerator = require("@/helper/functions/timeDateGenerator");
const { NextResponse } = require("next/server");
const {
  customErrorMiddleware,
} = require("@/helper/middleware/errorMiddleware");

// --------------------------------- Create Category -----------------------------------------

exports.postCreateCategoryController = async (req, params, next) => {
  try {
    const categoryData = await req.json();

    const isCategoryExists = await categoryService.getCategoryByName(
      categoryData.category
    );

    if (isCategoryExists) {
      return customErrorMiddleware(
        `Category already exists with given name.`,
        409
      );
    }

    //------- Generate current time to add in database
    const created_at = dateTimeGenerator.generateCurrentTiimeDate();

    const createCategoryResponse = await categoryService.createCategory({
      created_at,
      ...categoryData,
    });

    if (createCategoryResponse) {
      return NextResponse.json(
        {
          success: true,
          msg: "Category Created Successfully!!",
          resData: createCategoryResponse,
        },
        { status: 200 }
      );
    } else {
      return next(`Error While Creating Category`);
    }
  } catch (error) {
    console.log(
      "\n-------------------- Error Occured (Create Cateogry Controller)------------------\n",
      error
    );
    return next(error);
  }
};

// --------------------------------- Get All Categories -----------------------------------------

exports.getAllCategories = async (req, params, next) => {
  try {
    const getCategoryResponse = await categoryService.getAllCategories();

    if (getCategoryResponse) {
      return NextResponse.json(
        {
          success: true,
          msg: "Categories Fetched Successfully!!",
          resData: getCategoryResponse,
        },
        { status: 200 }
      );
    } else {
      return next(`Error While Getting Categories`);
    }
  } catch (error) {
    console.log(
      "\n-------------------- Error Occured (Get All Categories Controller)------------------\n",
      error
    );
    return next(error);
  }
};

// // --------------------------------- Update Course By ID -----------------------------------------

// exports.putUpdateCourseById = async(req,{params},next) =>{
//     try {

//         const {id} =  params;
//         const courseData =await req.json();

//         if(!id)
//         {
//             return NextResponse.json({
//                 success:true,
//                 msg : `Course Id Not Found In Req Params Required (id)`
//             },{status:400});
//         }

//         const courseResponse = await courseService.updateCourseById(id,courseData);

//         if(courseResponse)
//         {
//             return NextResponse.json({
//                 success:true,
//                 msg : "Course Updated Successfully !!!",
//                 courseResponse : courseResponse
//             },{status:200});
//         }else{
//             return next(`Error While Updating Course`);
//         }

//     } catch (error) {
//         console.log("\n-------------------- Error Occured (Update Course By Id Controller)------------------\n",error);
//         return next(error);
//     }
// }

// // --------------------------------- Delete Course By ID -----------------------------------------

// exports.deleteDeleteCourseById = async(req,{params},next) =>{
//     try {
//         const {id} = params;

//         if(!id)
//         {
//             return NextResponse.json({
//                 success:true,
//                 msg : `Course Id Not Found In Req Params Required (id)`
//             },{status:400});
//         }

//         const isCourseExists = await courseService.getCourseByCourseId(id);

//         if(!isCourseExists)
//         {
//             return NextResponse.json({
//                 success:true,
//                 msg : `Course not found with given id. Please check.`
//             },{status:409});
//         }

//         const courseResponse = await courseService.deleteCourseById(id);

//         if(courseResponse)
//         {
//             return NextResponse.json({
//                 success:true,
//                 msg : "Course Deleted Successfully !!!",
//                 courseResponse : courseResponse
//             },{status:200});
//         }else{
//             return next(`Error While Deleting Course`);
//         }

//     } catch (error) {
//         console.log("\n-------------------- Error Occured (Update Course By Id Controller)------------------\n",error);
//         return next(error);
//     }
// }

// // --------------------------------- Get Course By ID -----------------------------------------

// exports.getGetCourseById= async(req,{params},next)=>{

//     try {

//         const {id} = params;

//         const courseResponse = await courseService.getCourseByCourseId(id);

//         if(courseResponse)
//         {

//             return NextResponse.json({
//                 success:true,
//                 msg : "Course Fetched Successfully !!!",
//                 courseResponse : courseResponse
//             },{status:200});

//         }else{
//             return customErrorMiddleware("Course With Given Id Dosen't Found. Please Check Once.!!")
//         }

//     } catch (error) {
//         console.log("\n-------------------- Error Occured (Get Course By Id Controller)------------------\n",error);
//         return next(error);
//     }

// }
