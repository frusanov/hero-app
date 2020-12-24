import { createMachine, interpret, assign } from 'xstate';
import { createInstance } from 'localforage';

import Feat from './entities/Feat';

const db = createInstance({
  name: 'heroApp',
});

const restore = async function () {
  const feats: any = (await db.getItem('feats')) || [];
  const bullet: any = (await db.getItem('bullet')) || '';

  return {
    feats: feats.map((feat) => new Feat(feat)),
    bullet,
  };
};

const machine = createMachine(
  {
    id: 'heroApp',
    initial: 'restore',
    context: {
      feats: [],
      selected: new Set(),
      bullet: '',
    },
    states: {
      restore: {
        invoke: {
          id: 'getUser',
          src: restore,
          onDone: {
            target: 'idle',
            actions: assign({
              feats: (context, event) => event.data.feats,
              bullet: (context, event) => event.data.bullet,
            }),
          },
          onError: {
            target: 'idle',
          },
        },
      },
      idle: {
        on: {
          ADD: 'add',
          EDIT: 'edit',
          REMOVE: 'remove',
          SHARE: {
            target: 'idle',
            actions: ['share'],
          },
          SELECT: {
            target: 'idle',
            actions: ['select'],
          },
          SELECT_ALL: {
            target: 'idle',
            actions: ['selectAll'],
          },
          DESELECT_ALL: {
            target: 'idle',
            actions: ['deselectAll'],
          },
          SETTINGS: 'settings',
        },
      },
      add: {
        on: {
          ADD: {
            target: 'idle',
            actions: ['add', 'save'],
          },
          BACK: 'idle',
        },
      },
      edit: {
        on: {
          UPDATE: {
            target: 'idle',
            actions: ['update', 'save', 'deselectAll'],
          },
          BACK: {
            target: 'idle',
            actions: ['deselectAll'],
          },
        },
      },
      remove: {
        on: {
          REMOVE: {
            target: 'idle',
            actions: ['remove', 'save', 'deselectAll'],
          },
          BACK: 'idle',
        },
      },
      share: {
        on: {
          BACK: 'idle',
        },
      },
      settings: {
        on: {
          BACK: 'idle',
          UPDATE_BULLET: {
            target: 'settings',
            actions: ['updateBullet', 'save'],
          },
        },
      },
    },
  },
  {
    actions: {
      add(context, event) {
        context['feats'].push(new Feat({ text: event.text }));
      },
      select(context, event) {
        const ts = event.timestamp;

        if (context['selected'].has(ts)) {
          context['selected'].delete(ts);
        } else {
          context['selected'].add(ts);
        }
      },
      selectAll({ feats, selected }) {
        feats.forEach((feat) => {
          selected.add(feat.date);
        });
      },
      deselectAll(context) {
        context['selected'].clear();
      },
      update({ feats }, { text, date }) {
        const featIndex = feats.indexOf(
          feats.find((feat) => feat.date === date)
        );
        feats[featIndex].text = text;
      },
      remove(context, event) {
        const feats = context['feats'];
        const selected = context['selected'];

        selected.forEach((timestamp, index) => {
          const feat = feats.find((feat) => feat.date === timestamp);
          const featIndex = feats.indexOf(feat);

          context['feats'].splice(featIndex, 1);
        });
      },
      async share({ feats, bullet }) {
        let text = '';

        feats.forEach((feat) => {
          text = `${text} ${bullet || '✨'} ${feat.text} \r\n`;
        });

        if ('share' in navigator) {
          try {
            await navigator.share({
              title: 'Hero App',
              text: text,
            });
          } catch (err) {}
        } else {
          navigator.clipboard.writeText(text);
        }
      },
      save({ feats, bullet }) {
        db.setItem('feats', feats);
        db.setItem('bullet', bullet);
      },
      updateBullet(context, event) {
        context['bullet'] = event['bullet'];
      },
    },
  }
);

export const service = interpret(machine).start();

export default machine;
