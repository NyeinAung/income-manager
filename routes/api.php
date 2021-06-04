<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group(['prefix' => 'income'], function () {
    Route::get('/', 'API\IncomeController@index');
    Route::get('/detail/{id}', 'API\IncomeController@detail');
    Route::get('/create', 'API\IncomeController@create');
    Route::post('/store', 'API\IncomeController@store');
    Route::post('/update/{id}', 'API\IncomeController@update');
    Route::post('/delete/{id}', 'API\IncomeController@delete');
});

Route::group(['prefix' => 'wish-list'], function () {
    Route::get('/', 'API\WishListController@index');
    Route::get('/detail/{id}', 'API\WishListController@detail');
    Route::get('/create', 'API\WishListController@create');
    Route::post('/store', 'API\WishListController@store');
    Route::post('/update/{id}', 'API\WishListController@update');
    Route::post('/delete/{id}', 'API\WishListController@delete');
});

Route::group(['prefix' => 'manage-income'], function () {
    Route::get('/', 'API\ManageIncomeController@index');
    Route::get('/check', 'API\ManageIncomeController@checkManageIncome');
});