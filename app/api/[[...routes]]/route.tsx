/** @jsxImportSource frog/jsx */
import { Button, Frog } from 'frog';
import { handle } from 'frog/next';
import { devtools } from 'frog/dev';
import { serveStatic } from 'frog/serve-static';

// Function to fetch image URL from the API
async function fetchImageUrl() {
  const response = await fetch('https://www.k-marry-f.com/api/getPics');
  const data = await response.json();
  return data.url;
}

const app = new Frog({
  title: 'Frame', // Required title property
  imageAspectRatio: "1:1",
  imageOptions: { width: 600, height: 600 },
  basePath: '/api',
});

app.frame('/', async (c) => {
  const imageUrl = await fetchImageUrl();
  return c.res({
    image: imageUrl,
    intents: [
      <Button value="kiss">Kiss</Button>,
      <Button value="marry">Marry</Button>,
      <Button value="fade">Fade</Button>,
      <Button.Redirect location="https://www.k-marry-f.com/kmf">PLAY</Button.Redirect>
    ]
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);