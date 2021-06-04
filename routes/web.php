<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
})->middleware('auth');

Auth::routes(['password.request' => false, 'password.reset' => false]);

// Route::get('/home', 'HomeController@index')->name('home');
Route::get('/{any}', 'HomeController@index')->name('home')->where('any', '.+');
// Route::get('/post/{id}', 'HomeController@index')->name('home');
// Route::get('/post/{id}/edit', 'HomeController@index')->name('home');

// Route::get('/income', 'HomeController@index')->name('home');
// Route::get('/income/create', 'HomeController@index')->name('home');
// Route::get('/income/{id}/edit', 'HomeController@index')->name('home');

// Route::get('/wish-list', 'HomeController@index')->name('home');
// Route::get('/wish-list/create', 'HomeController@index')->name('home');
// Route::get('/wish-list/{id}/edit', 'HomeController@index')->name('home');
