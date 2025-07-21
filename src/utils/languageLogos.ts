export const getLanguageLogo = (language: string): string => {
  const logos: { [key: string]: string } = {
    // Programming Languages
    JavaScript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    TypeScript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    Python:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    "C++":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    Ruby: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
    Go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    Rust: "https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-plain.svg",
    Swift:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    Kotlin:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    Dart: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
    Scala:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg",
    R: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
    Perl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg",
    Lua: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg",
    Haskell:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg",
    Elixir:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg",
    Clojure:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/clojure/clojure-original.svg",
    "F#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fsharp/fsharp-original.svg",
    "Objective-C":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg",

    // Web Technologies
    HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    SCSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    Less: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/less/less-plain-wordmark.svg",

    // Frameworks & Libraries
    Vue: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    React:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    Angular:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    Svelte:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
    "Next.js":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "Nuxt.js":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",

    // Backend Frameworks
    "Node.js":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    Express:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    Django:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    Flask:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    Spring:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    Laravel:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
    Rails:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg",

    // Databases
    MySQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    PostgreSQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    MongoDB:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    Redis:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    SQLite:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",

    // DevOps & Tools
    Docker:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    Kubernetes:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    Jenkins:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
    Nginx:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
    Apache:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",

    // Mobile Development
    Flutter:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    "React Native":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    Ionic:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg",
    Xamarin:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xamarin/xamarin-original.svg",

    // Data Science & Analytics
    "Jupyter Notebook":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
    NumPy:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    Pandas:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    Matplotlib:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
    TensorFlow:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    PyTorch:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    Keras:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
    "Scikit-learn":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
    OpenCV:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",

    // Cloud Platforms
    AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    Azure:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    "Google Cloud":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    Firebase:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    Heroku:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
    Vercel:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    Netlify:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",

    // Additional Frameworks & Libraries
    Bootstrap:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    "Tailwind CSS":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    "Material-UI":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    jQuery:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
    "D3.js":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg",
    "Three.js":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
    "Socket.io":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    Redux:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    MobX: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mobx/mobx-plain.svg",
    Zustand:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",

    // Testing Frameworks
    Mocha:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg",
    Jasmine:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jasmine/jasmine-plain.svg",
    Playwright:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg",
    Selenium:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",

    // Additional Databases
    CouchDB:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/couchdb/couchdb-original.svg",
    Neo4j:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg",
    ElasticSearch:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
    InfluxDB:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/influxdb/influxdb-original.svg",
    Cassandra:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cassandra/cassandra-original.svg",

    // CMS & E-commerce
    WordPress:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
    Drupal:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/drupal/drupal-original.svg",
    Magento:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/magento/magento-original.svg",
    Shopify:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg",

    // Game Development
    Unity:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
    "Unreal Engine":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg",
    Godot:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg",

    // Operating Systems
    Linux:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    Ubuntu:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg",
    Debian:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg",
    CentOS:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/centos/centos-original.svg",
    Windows:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
    macOS:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",

    // Other Technologies
    GraphQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    Webpack:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
    Babel:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg",
    ESLint:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg",
    Jest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
    Cypress:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",

    // Markup & Config
    Markdown:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg",
    JSON: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg",
    YAML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yaml/yaml-original.svg",
    XML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg",

    // Shell & Scripts
    Shell:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    Bash: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    PowerShell:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg",

    // Assembly & Low Level
    Assembly:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/assembly/assembly-original.svg",
    VHDL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vhdl/vhdl-original.svg",
    Verilog:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/verilog/verilog-original.svg",
  };

  return (
    logos[language] ||
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-original.svg"
  );
};

export const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#239120",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Go: "#00ADD8",
    Rust: "#dea584",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Dart: "#00B4AB",
    HTML: "#e34c26",
    CSS: "#1572B6",
    SCSS: "#c6538c",
    Shell: "#89e051",
    Vue: "#4FC08D",
    React: "#61dafb",
    Angular: "#dd1b16",
    Svelte: "#ff3e00",
    "Node.js": "#339933",
    Express: "#000000",
    Django: "#092e20",
    Flask: "#000000",
    Spring: "#6db33f",
    Laravel: "#ff2d20",
    Rails: "#cc0000",
    MySQL: "#4479a1",
    PostgreSQL: "#336791",
    MongoDB: "#47a248",
    Redis: "#dc382d",
    SQLite: "#003b57",
    Docker: "#2496ed",
    Kubernetes: "#326ce5",
    Git: "#f05032",
    GraphQL: "#e10098",
    Webpack: "#8dd6f9",
    Babel: "#f9dc3e",
    Jest: "#c21325",
    Markdown: "#083fa1",
    JSON: "#000000",
    YAML: "#cb171e",
    XML: "#0060ac",
    Bash: "#4eaa25",
    PowerShell: "#5391fe",
    Assembly: "#6e4c13",
    Scala: "#dc322f",
    R: "#276dc3",
    Perl: "#39457e",
    Lua: "#2c2d72",
    Haskell: "#5e5086",
    Elixir: "#6e4a7e",
    Clojure: "#5881d8",
    "F#": "#b845fc",
    "Objective-C": "#438eff",

    // Additional Technologies
    "Jupyter Notebook": "#f37626",
    NumPy: "#013243",
    Pandas: "#150458",
    TensorFlow: "#ff6f00",
    PyTorch: "#ee4c2c",
    AWS: "#ff9900",
    Azure: "#0078d4",
    "Google Cloud": "#4285f4",
    Firebase: "#ffca28",
    Bootstrap: "#7952b3",
    "Tailwind CSS": "#06b6d4",
    "Material-UI": "#0081cb",
    jQuery: "#0769ad",
    Redux: "#764abc",
    Unity: "#000000",
    Linux: "#fcc624",
    Ubuntu: "#e95420",
    WordPress: "#21759b",
    Shopify: "#7ab55c",
  };

  return colors[language] || "#6366f1";
};