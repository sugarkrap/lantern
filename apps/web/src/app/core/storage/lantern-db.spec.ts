import 'fake-indexeddb/auto';
import { LanternDb } from './lantern-db';

describe('LanternDb', () => {
  let db: LanternDb;

  beforeEach(() => {
    db = new LanternDb(`lantern-test-${crypto.randomUUID()}`);
  });

  afterEach(async () => {
    await db.delete();
  });

  it('keeps a single current mascot', async () => {
    const first = new Blob(['first'], { type: 'image/png' });
    const second = new Blob(['second'], { type: 'image/webp' });

    await db.mascot.put({ id: 'current', image: first, updatedAt: 1 });
    await db.mascot.put({ id: 'current', image: second, updatedAt: 2 });

    expect(await db.mascot.count()).toBe(1);
    expect((await db.mascot.get('current'))?.updatedAt).toBe(2);
  });

  it('stores settings by key', async () => {
    await db.settings.put({ key: 'plainMode', value: true });

    expect((await db.settings.get('plainMode'))?.value).toBe(true);
  });
});
