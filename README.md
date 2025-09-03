# Player Embed System

A simple and reliable system for embedding video players with automatic server fallback.

## How to Use

### 1. Basic Implementation

Add the script to your HTML page:
```html
<script src="https://cdn.jsdelivr.net/gh/metclafe/embedjs@main/embed.js"></script>
```

Add the player div where you want the video to appear:
```html
<div playerembed="channel-name"></div>
```

### 2. Features

- Automatic server fallback
- Smart server availability checking
- Loading state indication
- Error handling with user-friendly messages
- Fullscreen support
- Responsive design (100% width)

### 3. Example

Complete example of implementation:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Player Example</title>
</head>
<body>
    <!-- Player will appear here -->
    <div playerembed="channel-name"></div>

    <!-- Add the script -->
    <script src="https://cdn.jsdelivr.net/gh/metclafe/embedjs@main/embed.js"></script>
</body>
</html>
```

### 4. Parameters

The `playerembed` attribute accepts the following format:
- `channel-name`: Your channel or video identifier

## License

MIT License
