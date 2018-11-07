export const lobbyStyle = {
  readyButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  chat: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    height: '200px',
  },
};

export const titleStyle = {
  title: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '50%',
    height: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export const slotGridStyle = {
  slotGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: '450px',
    height: '230px',
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
    marginRight: 10,
    width: '100px',
    height: '100px',
  },
  ready: {
    position: 'absolute',
    color: '#a6e22e',
    fontSize: 36,
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
    marginRight: 10,
    width: '100px',
    height: '100px',
    '&:first-child': {
      marginLeft: 10,
    },
  },
};
