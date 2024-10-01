import Dexie from 'dexie';
import moment from 'moment';
const DB_VERSION_NUMBER: number = 1;

export const TICKETS_TABLE_NAME: string = 'Tickets';
export const UPDATED_ON_TABLE_NAME = 'UpdatedOn';

export const UPDATE_ON_ID = {
  TICKETS: 'TICKETS',
};

export default class LocalDbService {
  localDb: any;
  props: any;
  db: any;

  constructor(props: any) {
    this.props = props;
    const db_name = props.dbName;
    this.db = new Dexie(db_name);
    const storeOptions: any = {};
    storeOptions[TICKETS_TABLE_NAME] = '&id,status,value';
    storeOptions[UPDATED_ON_TABLE_NAME] = '&id,createdAt,value';

    this.db
      .version(DB_VERSION_NUMBER)
      .stores(storeOptions)
      .upgrade(() => {
        if (DB_VERSION_NUMBER <= 1) {
          const clearDbData = async () => {
            await this.clearDbData();
            // eslint-disable-next-line no-undef
            window.location.reload();
          };
          clearDbData();
        }
      });
  }

  getDb() {
    const tableName = this.props.tableName;
    if (this.db) return this.db[tableName];
  }

  closeDb() {
    if (this.db) {
      this.db.close();
      this.db = undefined;
    }
  }

  static async deleteDatabase() {
    const databases = await Dexie.getDatabaseNames();
    for (let i = 0; i < databases.length; i += 1) {
      const db = new Dexie(databases[i]);
      db.delete();
    }
  }

  static async openDatabase() {
    const databases = await Dexie.getDatabaseNames();
    for (let i = 0; i < databases.length; i += 1) {
      const db = new Dexie(databases[i]);
      db.open();
    }
  }

  getMappedValues(list: any) {
    const dbItems = list?.map((x: any) => {
      const item: any = {
        id: x.id,
        createdAt: x.created_at,
        value: x,
      };
      if (x.status) item.status = x.status;
      if (x.date) item.date = x.date;
      if (this.props.tableName === TICKETS_TABLE_NAME) {
        item.createdAt = x.created_at;
        item.status = x.status;
      }

      return item;
    });
    return dbItems;
  }

  async get() {
    if (this.db) {
      const rows = await this.getDb().toArray();
      const result = rows.map((x: any) => x.value).filter((x: any) => x);
      return result;
    }
    return [];
  }

  async getItem(id: any) {
    if (this.db) {
      const rows = await this.getDb().where({ id: id }).limit(1).toArray();
      if (rows && rows.length > 0) {
        const result = rows.map((x: any) => x.value).filter((x: any) => x);
        return result[0];
      }
    }
    return null;
  }

  async clearDbData() {
    if (this.db) {
      await this.getDb().clear();
      await this.db[TICKETS_TABLE_NAME].clear();
      await this.db[UPDATED_ON_TABLE_NAME].clear();
      return true;
    }
    return false;
  }

  async addBulk(items: any) {
    if (this.db) {
      const result = await this.getDb().bulkPut(this.getMappedValues(items));
      return result;
    }
    return false;
  }

  async removeBulk(items: any) {
    if (this.db) {
      const result = await this.getDb().bulkDelete(items);
      return result;
    }
    return false;
  }

  async updateExisting(id: any, value: any) {
    if (value && this.db) {
      const dbItem = {
        id: id,
        tableId: value.tableId,
        value: value,
      };
      const result = await this.getDb().update(id, dbItem);
      return result;
    }
    return null;
  }

  async getLastUpdatedTime(id: any) {
    try {
      if (this.db) {
        const first = await this.db[UPDATED_ON_TABLE_NAME].where('id')
          .equals(id)
          .first();
        return first?.value || 0;
      }
      return 0;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return 0;
    }
  }

  async setLastUpdatedTime(id: string, value: any) {
    try {
      if (value && this.db) {
        const result = await this.db[UPDATED_ON_TABLE_NAME].put({
          id: id,
          value: value,
        });
        return result;
      }
      return null;
    } catch (error) {
      console.log('error : ', error);
    }
  }

  async syncList(newList: any, archivedList: any) {
    if (this.db) {
      //Add/update list only if have list of new/archived
      if (newList && newList.length > 0) {
        await this.addBulk(newList);
      }
      if (archivedList && archivedList.length > 0) {
        await this.removeBulk(archivedList);
      }
    }
  }

  async clearOlderThanThreeMonthsLocalData(statusArr: any) {
    const daysToClearOlderData = 90;
    const dateBeforeNDays = new Date(
      moment().subtract(daysToClearOlderData, 'days').toISOString(),
    ).toISOString();
    await this.getDb()
      .where('date')
      .belowOrEqual(dateBeforeNDays)
      .and((item: any) =>
        statusArr?.length === 0 ? true : statusArr?.includes(item?.status),
      )
      .delete();
  }
}
