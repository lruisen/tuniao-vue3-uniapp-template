export default {
    /**
     * opt  object | string
     * to_url object | string
     * 例:
     * this.Tips('/pages/test/test'); 跳转不提示
     * this.Tips({title:'提示'},'/pages/test/test'); 提示并跳转
     * this.Tips({title:'提示'},{tab:1,url:'/pages/index/index'}); 提示并跳转值tab上
     * tab=1 一定时间后跳转至 table上
     * tab=2 一定时间后跳转至非 table上
     * tab=3 一定时间后返回上页面
     * tab=4 关闭所有页面，打开到应用内的某个页面
     * tab=5 关闭当前页面，跳转到应用内的某个页面
     */
    Tips: function (opt: any, to_url: any) {
        if (typeof opt == 'string') {
            to_url = opt;
            opt = {};
        }

        let title = opt.title || '';
        let icon = opt.icon || 'none';
        let endtime = opt.endtime || 2000;
        let success = opt.success || null;

        if (title) {
            uni.showToast({
                title: title,
                icon: icon,
                duration: endtime,
                success
            });
        }
        if (to_url != undefined) {
            if (typeof to_url == 'object') {
                let tab = to_url.tab || 1,
                    url = to_url.url || '';
                switch (tab) {
                    case 1:
                        //一定时间后跳转至 table
                        setTimeout(function () {
                            uni.switchTab({
                                url: url
                            });
                        }, endtime);
                        break;
                    case 2:
                        //跳转至非table页面
                        setTimeout(function () {
                            uni.navigateTo({
                                url: url,
                            });
                        }, endtime);
                        break;
                    case 3:
                        //返回上页面
                        setTimeout(function () {
                            // #ifndef H5
                            uni.navigateBack({
                                delta: parseInt(url),
                            });
                            // #endif
                            // #ifdef H5
                            history.back();
                            // #endif
                        }, endtime);
                        break;
                    case 4:
                        //关闭所有页面，打开到应用内的某个页面
                        setTimeout(function () {
                            uni.reLaunch({
                                url: url,
                            });
                        }, endtime);
                        break;
                    case 5:
                        //关闭当前页面，跳转到应用内的某个页面
                        setTimeout(function () {
                            uni.redirectTo({
                                url: url,
                            });
                        }, endtime);
                        break;
                }

            } else if (typeof to_url == 'function') {
                setTimeout(function () {
                    to_url && to_url();
                }, endtime);
            } else {
                //没有提示时跳转不延迟
                setTimeout(function () {
                    uni.navigateTo({
                        url: to_url,
                    });
                }, title ? endtime : 0);
            }
        }
    }
};