<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WishList;

class WishListController extends Controller
{
    public function index() {
        try{
            $data = WishList::orderBy('id','asc')->paginate(10);
            return success($data);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function detail($id) {
        try{
            $data = WishList::find($id);
            return success($data);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function store(Request $request) {
        try{
            $data = [
                'item_name' => $request->item_name,
                'price' => $request->price
            ];

            $data = WishList::create($data);
            return success(true);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function update($id, Request $request) {
        try{
            $data = WishList::find($id);
            $data->item_name = $request->item_name;
            $data->price = $request->price;
            $data->save();

            return success(true);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function delete($id) {
        try{
            $data = WishList::find($id)->delete();
            return success(true);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }
}