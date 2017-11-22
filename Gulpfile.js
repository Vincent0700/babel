"use strict";

const plumber = require("gulp-plumber");
const through = require("through2");
const chalk = require("chalk");
const newer = require("gulp-newer");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const gutil = require("gulp-util");
const filter = require("gulp-filter");
const gulp = require("gulp");
const path = require("path");
const webpack = require("webpack");
const merge = require("merge-stream");
const registerStandalonePackageTask = require("./scripts/gulp-tasks")
  .registerStandalonePackageTask;

const sources = ["codemods", "packages"];

function swapSrcWithLib(srcPath) {
  const parts = srcPath.split(path.sep);
  parts[1] = "lib";
  return parts.join(path.sep);
}

function getGlobFromSource(source) {
  return `./${source}/*/src/**/*.js`;
}

gulp.task("default", ["build"]);

gulp.task("build", function() {
  return merge(
    sources.map(source => {
      const base = path.join(__dirname, source);
      const f = filter(["**", "!**/packages/babylon/**"]);

      return gulp
        .src(getGlobFromSource(source), { base: base })
        .pipe(f)
        .pipe(
          plumber({
            errorHandler: function(err) {
              gutil.log(err.stack);
            },
          })
        )
        .pipe(
          newer({
            dest: base,
            map: swapSrcWithLib,
          })
        )
        .pipe(
          through.obj(function(file, enc, callback) {
            gutil.log("Compiling", "'" + chalk.cyan(file.relative) + "'...");
            callback(null, file);
          })
        )
        .pipe(babel())
        .pipe(
          through.obj(function(file, enc, callback) {
            // Passing 'file.relative' because newer() above uses a relative
            // path and this keeps it consistent.
            file.path = path.resolve(file.base, swapSrcWithLib(file.relative));
            callback(null, file);
          })
        )
        .pipe(gulp.dest(base));
    })
  );
});

gulp.task("watch", ["build"], function() {
  watch(sources.map(getGlobFromSource), { debounceDelay: 200 }, function() {
    gulp.start("build");
  });
});

registerStandalonePackageTask(
  gulp,
  "babel",
  "Babel",
  path.join(__dirname, "packages"),
  require("./packages/babel-core/package.json").version
);

const presetEnvWebpackPlugins = [
  new webpack.NormalModuleReplacementPlugin(
    /\.\/available-plugins/,
    require.resolve(
      path.join(
        __dirname,
        "./packages/babel-preset-env-standalone/src/available-plugins"
      )
    )
  ),
  new webpack.NormalModuleReplacementPlugin(
    /caniuse-lite\/data\/regions\/.+/,
    require.resolve(
      path.join(
        __dirname,
        "./packages/babel-preset-env-standalone/src/caniuse-lite-regions"
      )
    )
  ),
];

registerStandalonePackageTask(
  gulp,
  "babel-preset-env",
  "babelPresetEnv",
  path.join(__dirname, "packages"),
  require("./packages/babel-preset-env/package.json").version,
  presetEnvWebpackPlugins
);
