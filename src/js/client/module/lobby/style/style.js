const slotItemSize = 140;
const slotItemMargin = 10;

export const lobbyStyle = {
  leftPanel: {
    width: '50%',
  },
  rightPanel: {
    width: '50%',
  },
  chat: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '400px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  readyButton: {
    width: 200,
    marginLeft: 30,
  },
};

export const titleStyle = {
  title: {
    fontWeight: 'bold',
  },
};

export const slotGridStyle = {
  slotGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: slotItemMargin,
    paddingTop: slotItemMargin,
    paddingBottom: slotItemMargin,
    width: slotItemSize * 2 + slotItemMargin * 3,
    height: slotItemSize * 4 + slotItemMargin * 5,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export const slotGridItemStyle = {
  slotGridItem: {
    position: 'relative',
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    fontSize: 16,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: slotItemMargin,
    width: slotItemSize,
    height: slotItemSize,
  },
  ready: {
    position: 'absolute',
    color: '#a6e22e',
    fontSize: 48,
    right: 0,
    bottom: 0,
  },
};

export const emptySlotGridItemStyle = {
  emptySlotGridItem: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    fontSize: 16,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: slotItemMargin,
    width: slotItemSize,
    height: slotItemSize,
    '&:first-child': {
      marginLeft: slotItemMargin,
    },
  },
};
