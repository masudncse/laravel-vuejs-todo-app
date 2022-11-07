<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $todos = Todo::with('category')->orderBy('name', 'asc')->get();
            $data = TodoResource::collection($todos);
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
    public function store(TodoRequest $request)
    {
        try {
            $data = $request->validated();
            $data['is_checked'] = 'checked';
            $todo = Todo::create($data);
            $data= new TodoResource($todo);
            return response()->sendSuccess($data, 'Todo Created Successfully');
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
        //
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
        try {
            $todo = Todo::findOrFail($id);
            switch($todo->is_checked){
                case 'checked':
                    $todo->update(['is_checked'=>'unchecked']);
                    break;
                case 'unchecked':
                    $todo->update(['is_checked'=>'checked']);
                    break;
            }
            return response()->sendSuccess($todo, 'Todo updated Successfully');
        }catch (\Exception $exception){
            return \response()->sendErrorWithException($exception, 'OPPS! Something Wrong', 500);
        }
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
            $todo = Todo::findOrFail($id);
            $todo->delete();
            $data = new TodoResource($todo);
            return response()->sendSuccess($data, 'Todo deleted Successfully');
        }catch (\Exception $exception){
            return \response()->sendErrorWithException($exception, 'OPPS! Something Wrong', 500);
        }
    }
}
