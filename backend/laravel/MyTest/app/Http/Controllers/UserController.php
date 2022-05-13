<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMailUser;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::get()->toJson(JSON_PRETTY_PRINT);
        return response($users, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        list($username, $domain) = explode('@', $request->email);

        if (!checkdnsrr($domain, 'MX')) {
            return response()->json([
                "message" => "E-mail inválido"
            ], 200);
        }

        if(User::where(['email' => $request->email])->count() > 0) {
            return response()->json([
                "message" => "E-mail já existe"
            ], 200);
        }

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->hash = Hash::make(date('Y-m-d H:m'));
        $user->hash_datetime = date('Y-m-d H:m:s');
        $user->save();

        $this->send_mail_user($user);

        return response()->json([
            "message" => "Cadastro realizado, em breve chegará um e-mail de confirmação!"
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $users = User::find($id); //->toJson(JSON_PRETTY_PRINT);
        return response($users, 200);
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
        //
    }

    public function login(Request $request)
    {
        $hash = $request->get('hash') ? $request->get('hash') : null;

        if($hash) {
            $user = User::where(['hash' => $hash])->get();
        }

        return response($user, 200);
    }

    private function send_mail_user($user)
    {
        Mail::to($user->email)->send(new SendMailUser($user));
    }
}
