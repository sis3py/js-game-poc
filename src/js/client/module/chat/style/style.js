export const chatStyle = {
  chat: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    height: '100%',
    background: '#0f0f0f',
  },
  messages: {
    height: 'calc(100% - 40px)',
    width: '100%',
    overflowY: 'scroll',
  },
  message: {
    minHeight: 20,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
  },
  notification: {
    color: '#ffa500',
    fontStyle: 'italic',
  },
  date: {
    marginRight: 10,
  },
  author: {
    marginRight: 10,
  },
  content: {
    color: '#FFFFFF',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    marginTop: 10,
    width: '100%',
  },
  textfield: {
    paddingLeft: 10,
    border: '1px solid #a6e22e',
    width: 'calc(100% - 160px)',
    marginRight: 10,
  },
  button: {
    width: 150,
  },
};
