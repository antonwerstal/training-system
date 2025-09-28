import React from 'react';
import { observer } from 'mobx-react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Text } from '@consta/uikit/Text';

@observer
export class App extends React.Component {
  render() {
    return (
      <Theme preset={presetGpnDefault}>
        <div style={{ padding: 'var(--space-xl)' }}>
          <Text size="2xl" weight="bold">
            RecordsCalendar
          </Text>
          <Text size="m" view="secondary" style={{ marginTop: 'var(--space-xs)' }}>
            Будет виджет календаря с карточками записей
          </Text>
        </div>
      </Theme>
    );
  }
}
