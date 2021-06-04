<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Income;

class IncomeController extends Controller
{
    public function index() {
        try{
            $data = Income::orderBy('id','desc')->get();
            return success($data);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function detail($id) {
        try{
            $data = Income::find($id);
            return success($data);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function store(Request $request) {
        try{
            if(Income::count() > 0) {
                return fail("Already Exists!");
            }

            $data = [
                'amount' => $request->amount
            ];

            $data = Income::create($data);
            return success(true);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function update($id, Request $request) {
        try{
            $data = Income::find($id);
            $data->amount = $request->amount;
            $data->save();

            return success(true);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function delete($id) {
        try{
            $data = Income::find($id)->delete();
            return success(true);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }
}