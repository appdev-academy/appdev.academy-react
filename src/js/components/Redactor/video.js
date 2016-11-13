// Process @[youtube](youtubeVideoID)
// Process @[vimeo](vimeoVideoID)

'use strict';

var EMBED_REGEX = /@\[([a-zA-Z].+)\]\([\s]*(.*?)[\s]*[\)]/im;

function video_embed(md, options) {
  function video_return(state, silent) {
    var serviceEnd,
        serviceStart,
        token,
        oldPos = state.pos;
        
    if (state.src.charCodeAt(oldPos) !== 0x40/* @ */ || state.src.charCodeAt(oldPos + 1) !== 0x5B/* [ */) {
      return false;
    }
    
    var match = EMBED_REGEX.exec(state.src);
    
    if (!match || match.length < 3) {
      return false;
    }
    
    var service = match[1].toLowerCase();
    var videoID = match[2];
    
    // If the videoID field is empty, regex currently make it the close parenthesis.
    if (videoID === ')') {
      videoID = '';
    }
    
    serviceStart = oldPos + 2;
    serviceEnd = md.helpers.parseLinkLabel(state, oldPos + 1, false);
    
    //
    // We found the end of the link, and know for a fact it's a valid link;
    // so all that's left to do is to call tokenizer.
    if (!silent) {
      state.pos = serviceStart;
      state.posMax = serviceEnd;
      state.service = state.src.slice(serviceStart, serviceEnd);
      var newState = new state.md.inline.State(service, state.md, state.env, []);
      newState.md.inline.tokenize(newState);
      
      token = state.push('video', '');
      token.videoID = videoID;
      token.service = service;
      token.level = state.level;
    }
    
    state.pos = state.pos + state.src.indexOf(')', state.pos);
    state.posMax = state.tokens.length;
    return true;
  }
  
  return video_return;
}

function video_url(service, videoID) {
  switch (service) {
    case 'youtube':
      return '//www.youtube.com/embed/' + videoID;
    case 'vimeo':
      return '//player.vimeo.com/video/' + videoID;
  }
}

function tokenize_video(md, options) {
  function tokenize_return(tokens, idx) {
    var videoID = md.utils.escapeHtml(tokens[idx].videoID);
    var service = md.utils.escapeHtml(tokens[idx].service).toLowerCase();
    return videoID === '' ? '' :
      '<div class="video-wrapper"><iframe src="' + video_url(service, videoID, options) +
      '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
  }
  
  return tokenize_return;
}

module.exports = function video_plugin(md, options) {
  md.renderer.rules.video = tokenize_video(md, options);
  md.inline.ruler.before('emphasis', 'video', video_embed(md, options));
}