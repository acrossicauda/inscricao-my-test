<html>
<body>
<p>Olá {{ $user->name }}!</p>
<p></p>
<p>Confirme seu e-mail para poder ter acesso ao conteúdo do site.</p>
<p><a href="{{ url('/') }}/login?hash={{ $user->hash }}">--> CLIQUE AQUI <--</a></p>
<small>Link válido por 1 hora</small>
<p>Att, <br>
    Tiago Sousa!</p>
</body>
</html>