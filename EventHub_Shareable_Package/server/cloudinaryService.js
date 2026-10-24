const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Initialize Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || '123456789012345',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'sample-secret',
  secure: true
});

const isConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_SECRET &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'demo'
);

/**
 * Generates an on-the-fly Dynamic Certificate URL using Cloudinary Layer Transformations!
 */
function generateCertificateUrl({
  participantName = 'Participant Name',
  eventTitle = 'National Hackathon 2026',
  role = 'Winner - 1st Place',
  date = 'October 2026',
  certId = 'EH-CERT-001',
  collegeName = 'Apex Institute of Technology',
  verifyBaseUrl = 'https://eventhub.demo/verify'
}) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'demo';

  const cleanName = encodeURIComponent(participantName.trim().replace(/,/g, '%2C').replace(/\//g, '%2F'));
  const cleanTitle = encodeURIComponent(eventTitle.trim().replace(/,/g, '%2C').replace(/\//g, '%2F'));
  const cleanRole = encodeURIComponent(role.trim().replace(/,/g, '%2C').replace(/\//g, '%2F'));
  const cleanDate = encodeURIComponent(`Issued: ${date}`.replace(/,/g, '%2C'));
  const cleanCertId = encodeURIComponent(`Credential ID: ${certId}`.replace(/,/g, '%2C'));
  const cleanCollege = encodeURIComponent(collegeName.replace(/,/g, '%2C'));

  const transformations = [
    'w_1200,h_850,c_fill,b_rgb:0f172a',
    'e_tint:80:black',
    `l_text:Cinzel_22_bold:${cleanCollege},co_rgb:93c5fd,g_north,y_70`,
    `l_text:Cinzel_36_bold:CERTIFICATE%20OF%20EXCELLENCE,co_rgb:f8fafc,g_north,y_130`,
    `l_text:Roboto_18:This%20is%20proudly%20presented%20to,co_rgb:94a3b8,g_north,y_200`,
    `l_text:Playfair%20Display_46_bold:${cleanName},co_rgb:fbbf24,g_north,y_250`,
    `l_text:Roboto_20:for%20distinguished%20performance%20as%20${cleanRole},co_rgb:e2e8f0,g_north,y_340`,
    `l_text:Cinzel_28_bold:in%20${cleanTitle},co_rgb:38bdf8,g_north,y_400`,
    `l_text:Roboto_16:${cleanDate},co_rgb:94a3b8,g_south_west,x_100,y_90`,
    `l_text:Roboto_16_bold:${cleanCertId},co_rgb:cbd5e1,g_south_west,x_100,y_60`,
    `l_text:Roboto_14_bold:%5B%E2%9C%93%20OFFICIALLY%20VERIFIED%20ON%20EVENTHUB%5D,co_rgb:10b981,g_south_east,x_100,y_60`,
    'q_auto,f_auto'
  ].join('/');

  const url = `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/samples/landscapes/nature-mountains.jpg`;

  return {
    url,
    transformations,
    cloudName,
    certId,
    verificationUrl: `${verifyBaseUrl}/${certId}`
  };
}

/**
 * Generates an official Dynamic Ticket Pass using Cloudinary transformations
 * Complete with pricing tier, barcode stamp, seat/pass ID, and event branding!
 */
function generateTicketUrl({
  attendeeName = 'Aarav Sharma',
  eventTitle = 'Hacktoberfest 2026',
  tier = 'VIP All-Access Pass',
  ticketId = 'TCK-9901',
  price = '₹0 (Free RSVP)',
  date = 'Nov 12, 2026',
  venue = 'Main Auditorium'
}) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'demo';
  const cleanName = encodeURIComponent(attendeeName);
  const cleanTitle = encodeURIComponent(eventTitle.slice(0, 30));
  const cleanTier = encodeURIComponent(tier.toUpperCase());
  const cleanId = encodeURIComponent(`#${ticketId}`);
  const cleanPrice = encodeURIComponent(price);
  const cleanDate = encodeURIComponent(date);
  const cleanVenue = encodeURIComponent(venue.slice(0, 24));

  const transformations = [
    'w_900,h_420,c_fill,b_rgb:090d16',
    'e_tint:85:navy',
    `l_text:Cinzel_20_bold:EVENTHUB%20OFFICIAL%20ADMISSION%20TICKET,co_rgb:60a5fa,g_north_west,x_50,y_40`,
    `l_text:Roboto_14_bold:%5B%20${cleanTier}%20%5D,co_rgb:38bdf8,g_north_east,x_50,y_40`,
    `l_text:Cinzel_26_bold:${cleanTitle},co_rgb:ffffff,g_north_west,x_50,y_90`,
    `l_text:Playfair%20Display_32_bold:${cleanName},co_rgb:fbbf24,g_north_west,x_50,y_150`,
    `l_text:Roboto_15:${cleanDate}%20%E2%80%A2%20${cleanVenue},co_rgb:94a3b8,g_north_west,x_50,y_210`,
    `l_text:Roboto_16_bold:Price%3A%20${cleanPrice},co_rgb:34d399,g_north_west,x_50,y_250`,
    `l_text:Roboto_16_bold:${cleanId},co_rgb:cbd5e1,g_south_west,x_50,y_40`,
    `l_text:Roboto_13:%E2%9C%93%20SECURE%20SCAN%20CODE%20VALID%20FOR%20ENTRY,co_rgb:10b981,g_south_west,x_200,y_40`,
    `l_text:Roboto_14_bold:DO%20NOT%20TEAR,co_rgb:64748b,g_east,x_60,a_90`,
    'q_auto,f_auto'
  ].join('/');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/samples/landscapes/beach-boat.jpg`;
}

/**
 * Generates dynamic Open Source Milestone Badge
 */
function generateMilestoneBadgeUrl({
  badgeName = 'First Pull Request Merged',
  recipientName = 'Aarav Sharma',
  level = 'Gold Tier'
}) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'demo';
  const cleanBadge = encodeURIComponent(badgeName.toUpperCase());
  const cleanName = encodeURIComponent(recipientName);
  const cleanLevel = encodeURIComponent(level);

  const transformations = [
    'w_600,h_600,c_fill,b_rgb:0f172a,r_max',
    'e_tint:90:purple',
    `l_text:Cinzel_20_bold:HACKTOBERFEST%20BADGE,co_rgb:c084fc,g_north,y_80`,
    `l_text:Playfair%20Display_26_bold:${cleanBadge},co_rgb:fef08a,g_center,y_-30`,
    `l_text:Roboto_18:Conferred%20Upon,co_rgb:94a3b8,g_center,y_40`,
    `l_text:Playfair%20Display_28_bold:${cleanName},co_rgb:ffffff,g_center,y_80`,
    `l_text:Roboto_14_bold:${cleanLevel},co_rgb:34d399,g_south,y_80`,
    'q_auto,f_auto'
  ].join('/');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/samples/people/boy-snow-hoodie.jpg`;
}

/**
 * Generates dynamic Digital Event Attendee Pass
 */
function generateAttendeeBadgeUrl({
  attendeeName = 'Aarav Sharma',
  eventTitle = 'Hacktoberfest 2026',
  passType = 'VIP Attendee',
  passId = 'PASS-7890'
}) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'demo';
  const cleanName = encodeURIComponent(attendeeName);
  const cleanTitle = encodeURIComponent(eventTitle);
  const cleanType = encodeURIComponent(passType.toUpperCase());
  const cleanId = encodeURIComponent(`#${passId}`);

  const transformations = [
    'w_800,h_1000,c_fill,b_rgb:030712',
    'e_tint:90:purple',
    `l_text:Cinzel_32_bold:EVENTHUB%20ACCESS%20PASS,co_rgb:f3e8ff,g_north,y_80`,
    `l_text:Roboto_18_bold:${cleanType},co_rgb:a855f7,g_north,y_150`,
    `l_text:Playfair%20Display_42_bold:${cleanName},co_rgb:ffffff,g_center,y_-80`,
    `l_text:Cinzel_28_bold:${cleanTitle},co_rgb:c084fc,g_center,y_0`,
    `l_text:Roboto_20_bold:${cleanId},co_rgb:94a3b8,g_south,y_120`,
    `l_text:Roboto_14:%E2%9C%93%20SCAN%20AT%20VENUE%20CHECK-IN,co_rgb:34d399,g_south,y_70`,
    'q_auto,f_auto'
  ].join('/');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/samples/people/boy-snow-hoodie.jpg`;
}

/**
 * Builds responsive Cloudinary variations for event banners & lecture cards
 */
function generateResponsiveBanners(publicId = 'samples/landscapes/beach-boat') {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'demo';
  const base = `https://res.cloudinary.com/${cloudName}/image/upload`;
  return {
    hero: `${base}/c_fill,ar_16:9,g_auto,w_1400,q_auto,f_auto/${publicId}`,
    card: `${base}/c_fill,ar_4:3,g_auto,w_800,q_auto,f_auto/${publicId}`,
    square: `${base}/c_fill,ar_1:1,g_auto,w_600,q_auto,f_auto/${publicId}`,
    mobileStory: `${base}/c_fill,ar_9:16,g_auto,w_720,q_auto,f_auto/${publicId}`
  };
}

/**
 * Generates Cloudinary Optimized Video Stream URL for Online Lectures & Masterclasses
 */
function generateLectureVideoUrl(videoPublicId = 'samples/sea-turtle') {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'demo';
  return `https://res.cloudinary.com/${cloudName}/video/upload/vc_auto,q_auto,w_1280/${videoPublicId}.mp4`;
}

module.exports = {
  cloudinary,
  isConfigured,
  generateCertificateUrl,
  generateTicketUrl,
  generateMilestoneBadgeUrl,
  generateAttendeeBadgeUrl,
  generateResponsiveBanners,
  generateLectureVideoUrl
};
