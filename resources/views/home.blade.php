@extends('layouts.app')

@section('content')
    <div id="react-js"></div>
    @push('react-css-include')
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap" rel="stylesheet">
        <!-- Fonts -->

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('assets/front/css/open-iconic-bootstrap.min.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/front/css/ionicons.min.css') }}">
        <!-- Styles -->
    @endpush

    @push('react-js-include')
        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>
        <script src="{{ asset('assets/front/js/main.js') }}"></script>
        <!-- Scripts -->

    @endpush
@endsection
