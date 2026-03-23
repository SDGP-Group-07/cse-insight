import api from "./api";

const SYMBOL_PREFIX = "CSELK:";

const ensureExchangePrefix = (symbol) => {
  if (!symbol) return symbol;
  return symbol.startsWith(SYMBOL_PREFIX) ? symbol : `${SYMBOL_PREFIX}${symbol}`;
};

const unwrapApiData = (response) => {
  if (!response) return null;
  if (
    response.data &&
    Object.prototype.hasOwnProperty.call(response.data, "data")
  ) {
    return response.data.data;
  }
  return response.data ?? null;
};

const normalizePredictionPayload = (payload) => {
  if (Array.isArray(payload)) {
    return payload[0] ?? null;
  }
  return payload;
};

const pickFirst = (obj, keys) => {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null) {
      return obj[key];
    }
  }
  return undefined;
};

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeExplanationItem = (item) => ({
  observation: pickFirst(item, ["observation", "Observation"]) ?? "No observation provided",
  why_it_matters:
    pickFirst(item, ["why_it_matters", "whyItMatters", "WhyItMatters"]) ??
    "No additional context provided",
  tip: pickFirst(item, ["tip", "Tip"]) ?? "No tip available",
});

const normalizePredictionRecord = (record) => {
  if (!record || typeof record !== "object") return null;

  const explanationRaw =
    pickFirst(record, [
      "model_prediction_explanation",
      "modelPredictionExplanation",
      "ModelPredictionExplanation",
    ]) ?? [];

  return {
    symbol: pickFirst(record, ["symbol", "Symbol"]) ?? "",
    current_date: pickFirst(record, ["current_date", "currentDate", "CurrentDate"]) ?? "",
    predicted_date: pickFirst(record, ["predicted_date", "predictedDate", "PredictedDate"]) ?? "",
    last_close: toNumber(pickFirst(record, ["last_close", "lastClose", "LastClose"])),
    predicted_close: toNumber(pickFirst(record, ["predicted_close", "predictedClose", "PredictedClose"])),
    probability_up: toNumber(pickFirst(record, ["probability_up", "probabilityUp", "ProbabilityUp"])),
    probability_down: toNumber(
      pickFirst(record, ["probability_down", "probabilityDown", "ProbabilityDown"])
    ),
    confidence: toNumber(pickFirst(record, ["confidence", "Confidence"])),
    ai_recommendation:
      pickFirst(record, ["ai_recommendation", "aiRecommendation", "AiRecommendation"]) ?? "HOLD",
    reason: pickFirst(record, ["reason", "Reason"]) ?? "No recommendation reason provided",
    model_prediction_explanation: Array.isArray(explanationRaw)
      ? explanationRaw.map(normalizeExplanationItem)
      : [],
  };
};

const predictionService = {
  getPrediction: async (symbol) => {
    const formattedSymbol = ensureExchangePrefix(symbol);
    const response = await api.get(`/StockPredictions/${encodeURIComponent(formattedSymbol)}`);
    const payload = normalizePredictionPayload(unwrapApiData(response));
    return normalizePredictionRecord(payload);
  },
};

export default predictionService;
