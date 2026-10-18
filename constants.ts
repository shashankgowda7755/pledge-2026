
import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'environment',
    label: '🌱 ENVIRONMENT',
    icon: 'Leaf',
    pledges: [
      {
        id: 1,
        text: 'I will use public transport more often instead of private vehicles',
        explanation: 'Reducing emissions and easing traffic congestion'
      },
      {
        id: 2,
        text: 'I will switch off lights and appliances when not in use',
        explanation: 'Saving energy starts at home'
      },
      {
        id: 3,
        text: 'I will reduce my use of single-use plastic',
        explanation: 'Small changes protect our planet'
      }
    ]
  },
  {
    id: 'health',
    label: '🥗 HEALTH & HABITS',
    icon: 'Heart',
    pledges: [
      {
        id: 4,
        text: 'I will reduce junk food and eat healthier',
        explanation: 'Better food, better life'
      },
      {
        id: 5,
        text: 'I will walk or exercise regularly',
        explanation: 'Consistency over intensity'
      },
      {
        id: 6,
        text: 'I will drink enough water every day',
        explanation: 'A simple habit with powerful impact'
      }
    ]
  },
  {
    id: 'lifestyle',
    label: '🧠 LIFESTYLE',
    icon: 'Brain',
    pledges: [
      {
        id: 7,
        text: 'I will reduce my daily screen time',
        explanation: 'More presence, less scrolling'
      },
      {
        id: 8,
        text: 'I will read or learn something new regularly',
        explanation: 'Growth begins with curiosity'
      },
      {
        id: 9,
        text: 'I will wake up earlier and build a better routine',
        explanation: 'Strong mornings create strong days'
      }
    ]
  }
];

export const SHARE_CAPTION = "I have taken my pledge even you start taking now. Join me in shaping a better 2025! 👇";

// Contact for privacy / grievance requests (DPDP Act 2023, IT Rules 2021).
// Set to the organisation's own domain inbox. Line is hidden while empty.
export const PRIVACY_CONTACT_EMAIL = '';
