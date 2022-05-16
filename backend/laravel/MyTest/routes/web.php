<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

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
    return view('welcome');
});

Route::get('/users', function () {
    dd(url('/'));
});

Route::get('usuario', 'App\Http\Controllers\UserController@index')->name('user.index');
Route::get('login', 'App\Http\Controllers\UserController@login')->name('user.login');
Route::get('usuario/{id}', 'App\Http\Controllers\UserController@show')->name('user.show');
Route::post('usuario', 'App\Http\Controllers\UserController@create')->name('user.create')->middleware("cors");
Route::put('usuario/{id}', 'App\Http\Controllers\UserController@update')->name('user.update');
Route::delete('usuario/{id}','App\Http\Controllers\UserController@delete')->name('user.delete');