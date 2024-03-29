<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Todo::all();
        return ok($todos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TodoRequest $request)
    {
        $todo = Todo::create($request->validated());
		return created($todo);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        if($todo){
            bad(null,'Not found');
        }
		return ok($todo);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        $todo = Todo::find($todo);
		return ok($todo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TodoRequest $request, Todo $todo)
    {
        if($todo){
            if(!$request->name){
                $todo->isCompleted = $todo->isCompleted ? false : true;
                $todo->completed_at = $todo->isCompleted ? Carbon::now() : null;
            }
            $todo->name = $request->name ? $request->name : $todo->name;

            $todo->save();
            return ok($todo,"Todo Updated");
        }
        return bad(null,'List Not Found');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return ok($todo,"Todo Deleted");
    }
}
