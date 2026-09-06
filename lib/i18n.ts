export const locales = ['en', 'si', 'ta'] as const;
export type Locale = (typeof locales)[number];

export const messages: Record<Locale, Record<string, string>> = {
  en: { home: 'Home', explore: 'Explore', messages: 'Messages', dashboard: 'Dashboard', signIn: 'Sign in', signOut: 'Sign out', createProfile: 'Create your profile' },
  si: { home: 'මුල් පිටුව', explore: 'ගවේෂණය', messages: 'පණිවිඩ', dashboard: 'පාලක පුවරුව', signIn: 'ඇතුළු වන්න', signOut: 'ඉවත් වන්න', createProfile: 'ඔබේ පැතිකඩ සාදන්න' },
  ta: { home: 'முகப்பு', explore: 'ஆராய்க', messages: 'செய்திகள்', dashboard: 'கட்டுப்பாட்டு பலகை', signIn: 'உள்நுழைக', signOut: 'வெளியேறு', createProfile: 'சுயவிவரத்தை உருவாக்கு' },
};

export function getMessages(locale: Locale = 'en') {
  return messages[locale] ?? messages.en;
}
