import LocalDbService, {
  TICKETS_TABLE_NAME,
  UPDATE_ON_ID,
} from './localDbService';
import UserPreferenceSingleton from '@/helpers/userPreferenceSingleton';

let singleton: any;
let organizationId: string | undefined;

export default class TicketCacheService extends LocalDbService {
  constructor(props: any) {
    const db_name = `${props.organizationId}`;
    props.dbName = db_name;
    props.tableName = TICKETS_TABLE_NAME;
    super(props);
  }

  static getInstance() {
    const company = UserPreferenceSingleton.getInstance().getCurrentWorkspace();
    if (company) {
      if (!singleton || organizationId !== company) {
        organizationId = company;
        singleton = new TicketCacheService({ organizationId: company });
      }
    }
    return singleton;
  }

  static removeInstance() {
    if (singleton) singleton.closeDb();
    organizationId = undefined;
    singleton = undefined;
  }

  async getLastUpdatedTime(companyId?: string) {
    const result = await super.getLastUpdatedTime(
      `${UPDATE_ON_ID.TICKETS}_${companyId}`,
    );
    return result;
  }

  async setLastUpdatedTime(value: string, companyId: string) {
    if (companyId !== organizationId) return false;
    const result = await super.setLastUpdatedTime(
      `${UPDATE_ON_ID.TICKETS}_${companyId}`,
      value,
    );
    return result;
  }
}
