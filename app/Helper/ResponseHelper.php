<?php

function success($data, $message = "success")
{
    return response()->json([
        'status' => 200,
        'message' => $message,
        'data' => $data
    ]);
}

function fail($data = [], $message = "fail")
{
    return response()->json([
        'status' => 401,
        'message' => $message,
        'data' => $data,
    ]);
}