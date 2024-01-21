<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('todos');

        if ($this->method() == 'POST') {
            return [
                'name' =>  'required|string|max:255|unique:todos,name',
            ];
		}

		if ($this->method() == 'PATCH' || $this->method() == 'PUT') {
            if(!$this->request->has('name')){
                return [];
            }
            return [
                'name' =>  'required|string|max:255|unique:todos,name,'.$id.',id',
            ];
        }
		return [];
    }
}
