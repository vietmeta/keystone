<!--[meta]
section: api
subSection: field-adapters
title: File Adapters
[meta]-->

# File Adapters

The `File` field type can support files hosted in a range of different contexts, e.g. in the local filesystem, or on a cloud based file server.

Different contexts are supported by different file adapters. This package contains the built-in file adapters supported by KeystoneJS.

## `LocalFileAdapter`

### Usage

```javascript
const { LocalFileAdapter } = require('@keystonejs/file-adapters');

const fileAdapter = new LocalFileAdapter({
  /*...config */
});
```

### Config

| Option        | Type       | Default        | Description                                                                                                                 |
| ------------- | ---------- | -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `src`         | `String`   | Required       | The path where uploaded files will be stored on the server.                                                                 |
| `path`        | `String`   | Value of `src` | The path from which requests for files will be served from the server.                                                      |
| `getFilename` | `Function` | `null`         | Function taking a `{ id, originalFilename }` parameter. Should return a string with the name for the uploaded file on disk. |

_Note:_ `src` and `path` may be the same.

### Methods

### `delete`

Takes an object with a `file` key representing the filename and deletes that file on disk. This can be combined with hooks to implement delete-on-file-change and delete-on-list-delete functionality:

```js
const { File } = require('@keystonejs/fields');

const fileAdapter = new LocalFileAdapter({
  src: './files',
  path: '/files',
});

keystone.createList('UploadTest', {
  fields: {
    file: {
      type: File,
      adapter: fileAdapter,
      hooks: {
        beforeChange: ({ existingItem = {} }) => fileAdapter.delete(existingItem),
      },
    },
  },
  hooks: {
    afterDelete: ({ existingItem = {} }) => fileAdapter.delete(existingItem),
  },
});
```

## `CloudinaryFileAdapter`

### Usage

```javascript
const { CloudinaryAdapter } = require('@keystonejs/file-adapters');

const fileAdapter = new CloudinaryAdapter({
  /*...config */
});
```

### Config

| Option      | Type     | Default     | Description |
| ----------- | -------- | ----------- | ----------- |
| `cloudName` | `String` | Required    |             |
| `apiKey`    | `String` | Required    |             |
| `apiSecret` | `String` | Required    |             |
| `folder`    | `String` | `undefined` |             |

### Methods

### `delete`

Takes an object with an `id` key representing the public file ID and deletes that file on the server.
