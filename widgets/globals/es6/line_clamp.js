/* The MIT License (MIT)
 * Copyright (c) 2016 Lim Yuan Qing
 * https://github.com/yuanqing/line-clamp
 **/


const ELLIPSIS = '\u2026';
const WHITESPACE_REGEX = /(?=\s)/;
const TRAILING_WHITESPACE_REGEX = /\s+$/;

// Truncate the text of `ele` such that it does not exceed the
// `maximumHeight`. Return `true` if we need to truncate by character, else
// return `false`.
function truncateByWord(ele, maximumHeight) {
    const innerHTML = ele.innerHTML;

    // Split the text of `ele` by whitespace.
    let chunks = innerHTML.split(WHITESPACE_REGEX);

    // The text does not contain whitespace; we need to attempt to truncate
    // by character.
    if (chunks.length === 1) {
        return true;
    }

    // Loop over the chunks, and try to fit more chunks into the `ele`.
    let i = -1;
    const length = chunks.length;
    let newInnerHTML = '';
    while (++i < length) {
        newInnerHTML += chunks[i];
        ele.innerHTML = newInnerHTML;

        // If the new height now exceeds the `maximumHeight` (where it did not
        // in the previous iteration), we know that we are at most one line
        // over the optimal text length.
        if (ele.offsetHeight > maximumHeight) {
            return true;
        }
    }

    return false;
}

// Append `ellipsisCharacter` to `ele`, trimming off trailing characters
// in `ele` such that `ele` will not exceed the `maximumHeight`.
function truncateByCharacter(ele, maximumHeight, endHtml, ellipsisCharacter) {
    const innerHTML = ele.innerHTML;
    let length = innerHTML.length;

    // In each iteration, we trim off one trailing character . Also trim
    // off any trailing punctuation before appending the `ellipsisCharacter`.
    while (length > 0) {
        ele.innerHTML = innerHTML.substring(0, length).replace(TRAILING_WHITESPACE_REGEX, '') + ellipsisCharacter;
        //end ending text exists and add the text into ele to constantly help determine offset height
        if (endHtml) {
            ele.innerHTML += endHtml.outerHTML;
        }

        if (ele.offsetHeight <= maximumHeight) {
            return;
        }
        length--;
    }
}

export default function (ele, {
    lineCount,
    ellipsisCharacter,
    endHtml
} = {}) {

    // Read the `line-height` of `ele`, and use it to compute the height of
    // `ele` required to fit the given `lineCount`.
    const lineHeight = parseInt(window.getComputedStyle(ele).lineHeight, 10);
    var maximumHeight = lineCount * lineHeight;
    // Exit if text does not overflow the `ele`.
    if (ele.scrollHeight <= maximumHeight) {
        return;
    }

    truncateByWord(ele, maximumHeight);
    truncateByCharacter(ele, maximumHeight, endHtml, ellipsisCharacter || ELLIPSIS);
}
