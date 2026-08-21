# Demo GraphQL — Biblioteca

Proyecto listo para live coding de una demo de GraphQL (15-20 min).

## Requisitos

- Node.js 18 o superior instalado de antemano (verifica con `node -v`)
- El resto (clonar el repo e instalar dependencias) se hace **en vivo, durante la demo**.

## Cómo correrlo (en vivo, frente al grupo)

```bash
git clone <URL-del-repo>
cd graphql-demo
npm install
npm start
```

`npm install` tarda solo unos segundos (son 2 dependencias). Aprovecha
ese momento para explicar qué son `graphql-yoga` y `graphql` mientras
corre, así no se siente como tiempo muerto.

Abre en el navegador: **http://localhost:4000/graphql**
(Yoga trae un playground integrado, no necesitas instalar nada extra).

## Estructura

- `schema.js` — define los tipos (`Book`, `Author`) y qué se puede preguntar (`Query`) o cambiar (`Mutation`).
- `data.js` — datos de ejemplo en memoria (simula una base de datos).
- `resolvers.js` — funciones que conectan el schema con los datos.
- `server.js` — levanta el servidor.

## Queries para mostrar en vivo (copia y pega en el playground)

### 1. Pedir solo lo que necesitas (el "aha" de GraphQL)

```graphql
{
  books {
    title
  }
}
```

Luego agrega más campos sin tocar el backend:

```graphql
{
  books {
    title
    year
    author {
      name
    }
  }
}
```

### 2. Pedir un solo libro por id

```graphql
{
  book(id: "1") {
    title
    author {
      name
      books {
        title
      }
    }
  }
}
```

Este ejemplo es bueno para mostrar cómo se navegan relaciones anidadas
(libro → autor → todos sus libros) en una sola petición.

### 3. Mutation: agregar un libro en vivo

```graphql
mutation {
  addBook(title: "100 años de trámites", year: 2026, authorId: "1") {
    id
    title
    author {
      name
    }
  }
}
```

Después vuelve a correr la query de `books` para que vean el libro nuevo
reflejado al instante.

## Para el cierre (comparación con REST)

Con REST, lo anterior hubiera necesitado varios endpoints:
- `GET /books`
- `GET /books/:id`
- `GET /authors/:id`
- `GET /authors/:id/books`
- `POST /books`

Con GraphQL, todo pasa por **un solo endpoint** (`/graphql`), y el cliente
decide exactamente qué campos necesita en cada petición.
