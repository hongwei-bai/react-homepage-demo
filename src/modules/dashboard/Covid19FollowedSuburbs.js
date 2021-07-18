import React from 'react';

export let followedSuburbs = [
    {postcode: 2070, suburb: "Lindfield"},
    {postcode: 2071, suburb: "Killara"},
    {postcode: 2072, suburb: "Gordon"},
    {postcode: 2073, suburb: "Pymble"},
    {postcode: 2074, suburb: "Turramurra"},
    {postcode: 2075, suburb: "St.Ives"},
    {postcode: 2076, suburb: "Wahroonga"},
    {postcode: 2077, suburb: "Hornsby"},
    {postcode: 2084, suburb: "Terrey Hills"},
    {postcode: 2085, suburb: "Belrose"},
    {postcode: 2113, suburb: "Macquarie"},
    {postcode: 2118, suburb: "Carlingford"},
    {postcode: 2121, suburb: "Epping"},
    {postcode: 2122, suburb: "Eastwood"}
]

export let followedPostcodes = followedSuburbs.map(item => item.postcode)