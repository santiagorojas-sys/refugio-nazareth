<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mensajes de contacto - Refugio Nazareth</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f1f5f9;
            margin: 0;
            padding: 2rem;
            color: #0f172a;
        }

        .contenedor {
            max-width: 1100px;
            margin: 0 auto;
        }

        h1 {
            margin-bottom: 1.5rem;
        }

        .tabla-wrap {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        thead {
            background: #1d4ed8;
            color: white;
        }

        th, td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: top;
        }

        th {
            font-size: 0.95rem;
        }

        td {
            font-size: 0.95rem;
            color: #334155;
        }

        .mensaje {
            white-space: pre-wrap;
            line-height: 1.5;
            max-width: 420px;
        }

        .vacio {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            color: #64748b;
            box-shadow: 0 10px 30px rgba(0,0,0,0.06);
        }

        .badge {
            display: inline-block;
            padding: 0.4rem 0.7rem;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 700;
            background: #dbeafe;
            color: #1d4ed8;
        }
    </style>
</head>
<body>
    <div class="contenedor">
        <h1>Mensajes recibidos</h1>

        @if($contactos->count() === 0)
            <div class="vacio">
                Aún no hay mensajes guardados.
            </div>
        @else
            <div class="tabla-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Mensaje</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($contactos as $contacto)
                            <tr>
                                <td>{{ $contacto->id }}</td>
                                <td>{{ $contacto->nombre }}</td>
                                <td>{{ $contacto->correo }}</td>
                                <td class="mensaje">{{ $contacto->mensaje }}</td>
                                <td>
                                    <span class="badge">
                                        {{ $contacto->created_at->format('d/m/Y H:i') }}
                                    </span>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>
</body>
</html>