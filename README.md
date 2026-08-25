# Demo GraphQL — Biblioteca de libros y autores

## Requisitos

- Node.js 18 o superior instalado de antemano (verifica con `node -v`)

## Cómo correrlo

```bash
git clone https://github.com/Kashiseitos/graphql-demo.git
cd graphql-demo
npm install graphql graphql-yoga
npm start
```

Abre en el navegador: **http://localhost:4000/graphql**

## Estructura

- `schema.js` — define los tipos (`Book`, `Author`) y qué se puede preguntar (`Query`) o cambiar (`Mutation`).
- `data.js` — datos de ejemplo (simula una base de datos).
- `resolvers.js` — funciones que conectan el schema con los datos.
- `server.js` — levanta el servidor.

## Queries

### 1. Pedir solo lo que necesitas

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
    id
    title
    author {
      name
    }
  }
}
```

```graphql
{
  author(id: "1") {
    id
    name
  }
}
```

Añadir definiciones para hacer el query de autor por id en `schema.js` y `resolvers.js`.

```graphql
{
  author(id: "1") {
    id
    name
  }
}
```

### 3. Pedir todos los autores

```graphql
{
  authors {
    id
    name
  }
}
```

Ver todos los libros de todos los autores

```graphql
{
  authors {
    id
    name
    books {
      title
      year
    }
  }
}
```

### 4. Mutation: agregar datos

```graphql
{
  books {
    title
    year
  }
}
```

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

```graphql
{
  books {
    title
    year
  }
}
```

## Comparación con REST

Con REST, lo anterior hubiera necesitado varios endpoints:
- `GET /books`
- `GET /books/:id`
- `GET /authors/:id`
- `GET /authors/:id/books`
- `POST /books`

Con GraphQL, todo pasa por **un solo endpoint** (`/graphql`), y el cliente
decide exactamente qué campos necesita en cada petición.
