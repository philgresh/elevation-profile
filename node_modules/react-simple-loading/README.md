# react-simple-loading

A simple React component to display while you're fetching data or waiting for something to load. This component consists of 2 divs: an inner, which is the spinner, and an outer, which is the container. The outer has its height and width set to 100% and uses flexbox to display the spinner perfectly in the center of its parent container.

## Installation

```
npm i --save react-simple-loading

```

## Demo

![demo](./loading.gif)

## Example

```jsx
import React, { Component } from 'react';
import Loading from 'react-simple-loading';

class App extends Component {
	render() {
		return (
			<div>
				<Loading />
			</div>
		);
	}
}
```

## Options

You can change the component size, stroke color, and stroke size by passing props like so:

```jsx
<Loading 
	color={'firebrick'}
	stroke={'10px'}
	size={'100px'} />
```

`color` can be any valid css color:

```css
LightSeaGreen
rgb(0, 0, 0)
rgba(0, 0, 0, 1)
hsl(0, 0%, 0%)
hsla(0, 0%, 0%, 1)
#000
#000000
```

## License

MIT