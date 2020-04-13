# Import custom libraries and helpers
Dir['./*/*.rb'].each { |file| load file }

# Load Sass from node_modules
config[:sass_assets_paths] << File.join(root, 'node_modules')

set(:css_dir,    'assets/stylesheets')
set(:fonts_dir,  'assets/fonts')
set(:images_dir, 'assets/images')
set(:js_dir,     'assets/javascripts')

# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |config|
  config.browsers = '>0.25%, not ie 11, not op_mini all, not dead'
end

activate(
  :external_pipeline,
  name: :webpack,
  command: build? ? 'yarn run build' : 'yarn run start',
  source: 'dist',
  latency: 1
)

page('/*.xml',  layout: false)
page('/*.json', layout: false)
page('/*.txt',  layout: false)
page('/admin/*', layout: false)
page '/sitemap.xml', layout: false

proxy '/sw.js', 'serviceworkers.txt', layout: false, ignore: true
proxy '/_headers', '/headers.txt', layout: false, ignore: true
proxy '_redirects', 'netlify-redirects', ignore: true

configure :development do
  set      :debug_assets, true
end

configure :build do
  ignore   File.join(config[:js_dir], '*')
  set      :relative_links, true
  activate :asset_hash
  activate :gzip
  activate :minify_css
  activate :relative_assets
end

data.posts.each do |_filename, post|
  # product is an array: [_filename, {data}]
  proxy "/posts/#{post[:title].parameterize}/index.html",
        'posts-detail.html',
        locals: { post: post },
        layout: 'layout',
        ignore: true
end

helpers do
  def markdown(content)
    Tilt['markdown'].new(context: @app) { content }.render
  end
end
