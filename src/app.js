import angular from 'angular';
import CoreModule from './core/core.module';
import EmailsModule from './emails/emails.module';

angular.module('app', [
    CoreModule,
    EmailsModule
]).config(($compileProvider) => {
    $compileProvider.debugInfoEnabled(process.env.NODE_ENV !== 'production');
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
});
