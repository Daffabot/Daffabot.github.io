export const articleComments = `<article>
                                <h2 class="text-center">Comments</h2>
                                <div id="disqus_thread"></div>
                                <button id="loadDisqus" class="button">Open</button>
                                <noscript>
                                Please enable JavaScript to view the
                                <a href="https://disqus.com/?ref_noscript">comments powered by Daffabot.</a>
                                </noscript>
                                </article>`;

export const loadDisqus = () => {
  document.getElementById('loadDisqus').classList.add('closeport');

  const script = Object.assign(document.createElement('script'), {
    src: 'https://daffabot-main.disqus.com/embed.js',
    'data-timestamp': Date.now()
  });

  (document.head || document.body).appendChild(script);
};