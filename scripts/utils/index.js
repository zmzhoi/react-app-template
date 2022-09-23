function fixPublicUrl(publicUrl) {
  if (!publicUrl) {
    return '/';
  }

  if (publicUrl.endsWith('/')) {
    return publicUrl.slice(0, publicUrl.length - 1);
  }

  return publicUrl;
}

function toSpecifiedHost(host) {
  if (host === '0.0.0.0' || host === '::') {
    return 'localhost';
  }

  return host;
}

module.exports = {
  fixPublicUrl,
  toSpecifiedHost,
};
