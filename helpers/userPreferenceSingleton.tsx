/* eslint-disable no-undef */
import { USER_PREFERENCES } from '@/global/constants';

let singleton: any;
const singletonEnforcer = Symbol();
const parseDataFile = (defaults: any) => {
  try {
    const settings = localStorage.getItem(USER_PREFERENCES);
    if (settings) return JSON.parse(settings);
    return {};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return defaults;
  }
};

const containsKey = (obj: any, key: any) =>
  ({}).hasOwnProperty.call(obj || {}, key);

class UserPreferences {
  defaults: any;
  data: any;
  constructor(opts: any) {
    this.defaults = opts.defaults;
    this.data = parseDataFile(opts.defaults);
  }

  get(key: any, defaultValue: any) {
    if (containsKey(this.data, key)) {
      return this.data[key];
    }
    return defaultValue;
  }

  save(settings: any) {
    localStorage.setItem(USER_PREFERENCES, JSON.stringify(settings));
  }

  set(key: any, value: any) {
    this.data = parseDataFile(this.defaults);
    this.data[key] = value;
    this.save(this.data);
  }

  remove(key: any) {
    delete this.data[key];
    this.save(this.data);
  }

  parseDataFile() {
    this.data = parseDataFile(this.defaults);
  }

  contains(key: any) {
    return Object.prototype.hasOwnProperty.call(this.data, key);
  }
}
export default class UserPreferenceSingleton {
  userPreferences: UserPreferences;

  static get CURRENT_WORKSPACE() {
    return 'current_workspace';
  }

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer)
      throw new Error('Cannot construct singleton');

    this.userPreferences = new UserPreferences({
      configName: 'user-preferences',
      defaults: {
        windowBounds: { width: 800, height: 600 },
      },
    });
  }

  static getInstance() {
    if (!singleton) {
      singleton = new UserPreferenceSingleton(singletonEnforcer);
    }
    return singleton;
  }

  static removeInstance() {
    singleton = undefined;
  }

  getCurrentWorkspace() {
    return this.userPreferences.get(
      UserPreferenceSingleton.CURRENT_WORKSPACE,
      undefined,
    );
  }

  setCurrentWorkspace(value: string) {
    return this.userPreferences.set(
      UserPreferenceSingleton.CURRENT_WORKSPACE,
      value,
    );
  }

  get(key: any, defaultValue = null) {
    return this.userPreferences.get(key, defaultValue);
  }

  set(key: any, value: any) {
    this.userPreferences.set(key, value);
  }

  clearStoredUserData() {
    localStorage.removeItem(USER_PREFERENCES);
  }
}
