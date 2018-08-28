var cheerio = require("cheerio");
var URL = require("url-parse");
var util = require('util');
let $ = null;
let host = null;
function load(html_string) {
  $ = html_string
    ? cheerio.load(html_string)
    : throw_exception("HTML String is not passed.");
}

function set_host_name(host_name) {
  host = host_name ? host_name : throw_exception("Host name is undefined.");
}

function throw_exception(message = "Exception Occur") {
  throw new Exception(message);
}

function check_replace_media() {
  update_links();
}

function update_links() {
  $("link").each((index, element) => {
    update_relative_path(element, "href");
  });
}

function update_scripts() {}
function update_images() {}

function update_fonts() {}

function update_audio() {}

function update_video() {}

function html() {
  return $.html();
}

function update_relative_path(element, attribute) {
  const attr_value = $(element).attr(attribute);
  !is_valid_url(attr_value) && $(element).attr(attribute, host + attr_value);
}

function is_valid_url(url) {
    const u = new URL(url);
    return (u.origin !== 'null')
}
module.exports = {
  load: load,
  set_host_name: set_host_name,
  check_replace_media: check_replace_media,
  html: html
};
