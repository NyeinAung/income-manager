<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Income;
use App\Models\WishList;

class ManageIncomeController extends Controller
{
    public function index() {
        try{
            $checkdata = $this->checkManageIncome();
            if($this->checkManageIncome()["status"] != 200) {
                return fail([]);
            }

            $income = Income::first();
            $wishlists = WishList::orderby("id", "asc")->get();

            $income_amount = round((20 / 100) * $income->amount, 0);
            $matchlists = [];
            for($i=1; $i <=12; $i++) {
                $extra_money = $income_amount * $i;
                $possible_matches = [];

                foreach($wishlists as $key => $value) {
                    $is_pair = false;

                    for($j=$key+1; $j < count($wishlists); $j++) {
                        $match_amount = $value->price + $wishlists[$j]->price;
                        if($extra_money >= $match_amount) {
                            $possible_matches[] = "(".$value->item_name.", ".$wishlists[$j]->item_name.")";
                            $is_pair = true;
                        }
                    }

                    if($is_pair == false && $extra_money >= $value->price) {
                        if(count($possible_matches) > 0) {
                            $possible_matches[] = "(".$value->item_name.")";
                        } else {
                            $possible_matches[] = $value->item_name;
                        }
                    }
                }

                $str_matches = implode(" OR \n", $possible_matches);
                $matchlists[] = array("month" => $this->getMonthName($i), "match_name" => $str_matches);
            }

            return success($matchlists);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function checkManageIncome() {
        try{
            if(Income::count() > 0 && WishList::count() > 0) {
                return [
                    'status' => 200
                ];
            }

            return [
                'status' => 401
            ];

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    function getMonthName($month) {
        $months = array(
            1   =>  'January',
            2   =>  'February',
            3   =>  'March',
            4   =>  'April',
            5   =>  'May',
            6   =>  'June',
            7   =>  'July',
            8   =>  'August',
            9   =>  'September',
            10  =>  'October',
            11  =>  'November',
            12  =>  'December'
        );

        return $months[$month];
    }
}