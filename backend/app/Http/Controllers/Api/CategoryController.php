<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $categories = Category::orderBy('name', 'asc')->get();
            $data = CategoryResource::collection($categories);
            return response()->sendSuccess($data, 'Categories List');
        }catch (\Exception $exception){
            return \response()->sendErrorWithException($exception, 'OPPS! Something Wrong', 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $request)
    {
        try {
            $categoryData = Category::create($request->validated());
            $category= new CategoryResource($categoryData);
            return response()->sendSuccess($category, 'Category Created Successfully');
        }catch (\Exception $exception){
            return \response()->sendErrorWithException($exception, 'OPPS! Something Wrong', 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $categoryData = Category::with('todos')->findOrFail($id);
            $category = new CategoryResource($categoryData);
            return response()->sendSuccess($category, 'Category Created Successfully');
        }catch (\Exception $exception){
            return \response()->sendErrorWithException($exception, 'OPPS! Something Wrong', 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $categoryData = Category::findOrFail($id);
            $categoryData->delete();
            $category= new CategoryResource($categoryData);
            return response()->sendSuccess($category, 'Category deleted Successfully');
        }catch (\Exception $exception){
            return \response()->sendErrorWithException($exception, 'OPPS! Something Wrong', 500);
        }
    }
}
