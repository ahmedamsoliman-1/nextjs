"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const operators_1 = require("rxjs/operators");
const uuid_1 = require("uuid");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor() {
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        if (context.getType() === 'http') {
            return this.logHttpCall(context, next);
        }
        if (context.getType() === 'graphql') {
            return this.logGraphqlCall(context, next);
        }
    }
    logHttpCall(context, next) {
        const request = context.switchToHttp().getRequest();
        const userAgent = request.get('user-agent') || '';
        const { ip, method, path: url } = request;
        const correlationKey = (0, uuid_1.v4)();
        const userId = request.user?.userId;
        this.logger.log(`[${correlationKey}] ${method} ${url} ${userId} ${userAgent} ${ip}: ${context.getClass().name} ${context.getHandler().name}`);
        const now = Date.now();
        return next.handle().pipe((0, operators_1.tap)(() => {
            const response = context.switchToHttp().getResponse();
            const { statusCode } = response;
            const contentLength = response.get('content-length');
            this.logger.log(`[${correlationKey}] ${method} ${url} ${statusCode} ${contentLength}: ${Date.now() - now}ms`);
        }));
    }
    logGraphqlCall(context, next) {
        const graphqlContext = graphql_1.GqlExecutionContext.create(context);
        const info = graphqlContext.getInfo().path;
        const correlationKey = (0, uuid_1.v4)();
        const request = graphqlContext.getContext().req;
        const userId = request.user?.userId;
        const userAgent = request.get('user-agent') || '';
        const ip = request.ip;
        this.logger.log(`[${correlationKey}] ${info.typename} ${info.key} ${userId} ${userAgent} ${ip}: ${context.getClass().name} ${context.getHandler().name}`);
        const now = Date.now();
        return next.handle().pipe((0, operators_1.tap)(() => {
            const { statusCode } = request.res;
            this.logger.log(`[${correlationKey}] ${info.typename} ${info.key} ${statusCode}: ${Date.now() - now}ms`);
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map