import { vi } from "vitest";

export const createSocket = vi.fn();

export const setRunProjectListener = vi.fn();

export const setGetLanguagesListener = vi.fn();

export const emitGetLanguages = vi.fn();

export const emitRunProject = vi.fn();

export const isConnected = vi.fn();

export const disconnectAndClearSocket = vi.fn();
