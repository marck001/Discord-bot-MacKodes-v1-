"use strict"
const googleTTS = require('google-tts-api');
const fs = require('fs');
const Stream = require('stream');

function base64toBinaryStream(base64Text){
  const audioBinaryStream = new Stream.Readable();
  audioBinaryStream.push(Buffer.from(base64Text, 'base64'));
  audioBinaryStream.push(null);
  return audioBinaryStream;
}

/**
 * @param {string} text
 * @param {PlainObject} cfg
 * @param {Language} cfg.lang
 * @param {boolean} cfg.slow
 * @param {string} cfg.host
 * @param {number} cfg.timeout
 * @param {string} cfg.splitPunct
 */


function getVoice(text, {lang = 'en', slow = false, host = 'https://translate.google.com', timeout = 10000, splitPunct} = {}) {
    const stream = new Stream.PassThrough();
    downloadFromInfoCallback(stream, text, {lang, slow, host, timeout, splitPunct });
    console.log(lang)
    return stream;
}

/**
 * @param {string} filePath
 * @param {string} text
 * @param {PlainObject} cfg
 * @param {Language} [cfg.lang="en-GB"]
 * @param {number} [cfg.slow=false]
 * @param {string} cfg.host
 * @param {number} cfg.timeout
 * @param {string} cfg.splitPunct
 */

function downloadFromInfoCallback(stream, text, {lang, slow, host, timeout, splitPunct}) {
  googleTTS.getAllAudioBase64(text, {lang, slow, host, timeout, splitPunct})
    .then(base64Audio => base64toBinaryStream(base64Audio))
    .then(audioStream => audioStream.pipe(stream))
    .catch(console.error);
   
}

module.exports.getVoice = getVoice;



